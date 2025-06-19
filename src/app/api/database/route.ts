import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

/**
 * 获取数据库版本和信息
 * GET /api/database/info
 */
export async function GET() {
  try {
    // 获取数据库版本信息
    const versionResult = await prisma.$queryRaw<Array<{ version: string }>>`
      SELECT version()
    `;

    // 获取当前数据库名称
    const databaseResult = await prisma.$queryRaw<Array<{ current_database: string }>>`
      SELECT current_database()
    `;

    // 获取当前用户
    const userResult = await prisma.$queryRaw<Array<{ current_user: string }>>`
      SELECT current_user
    `;

    // 获取当前时间戳
    const timestampResult = await prisma.$queryRaw<Array<{ now: Date }>>`
      SELECT NOW() as now
    `;

    // 获取数据库大小信息
    const sizeResult = await prisma.$queryRaw<
      Array<{ database_size: string; database_name: string }>
    >`
      SELECT 
        pg_database.datname as database_name,
        pg_size_pretty(pg_database_size(pg_database.datname)) as database_size
      FROM pg_database 
      WHERE pg_database.datname = current_database()
    `;

    // 获取表信息统计
    const tableStatsResult = await prisma.$queryRaw<
      Array<{
        table_count: bigint;
      }>
    >`
      SELECT 
        COUNT(*) as table_count
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;

    // 获取连接信息
    const connectionResult = await prisma.$queryRaw<
      Array<{
        application_name: string;
        client_addr: string;
        backend_start: Date;
        state: string;
      }>
    >`
      SELECT 
        application_name,
        client_addr,
        backend_start,
        state
      FROM pg_stat_activity 
      WHERE pid = pg_backend_pid()
    `;

    // 获取用户表列表
    const userTablesResult = await prisma.$queryRaw<
      Array<{
        table_name: string;
        table_size: string;
      }>
    >`
      SELECT 
        table_name,
        pg_size_pretty(pg_total_relation_size(quote_ident(table_name)::regclass)) as table_size
      FROM information_schema.tables
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND table_name NOT LIKE '_prisma_%'
      ORDER BY table_name
    `;

    // 尝试获取表的行数统计（使用pg_stat_user_tables）
    let tableRowCounts: Array<{
      name: string;
      estimatedRows: number;
      size: string;
    }> = [];

    try {
      const rowCountsResult = await prisma.$queryRaw<
        Array<{
          table_name: string;
          estimated_rows: bigint | null;
        }>
      >`
        SELECT 
          t.table_name,
          s.n_live_tup as estimated_rows
        FROM information_schema.tables t
        LEFT JOIN pg_stat_user_tables s ON s.relname = t.table_name
        WHERE t.table_schema = 'public' 
          AND t.table_type = 'BASE TABLE'
          AND t.table_name NOT LIKE '_prisma_%'
        ORDER BY t.table_name
      `;

      tableRowCounts = userTablesResult.map(table => {
        const rowCount = rowCountsResult.find(r => r.table_name === table.table_name);
        return {
          name: table.table_name,
          estimatedRows: Number(rowCount?.estimated_rows || 0),
          size: table.table_size,
        };
      });
    } catch {
      // 如果获取行数失败，使用基础信息
      tableRowCounts = userTablesResult.map(table => ({
        name: table.table_name,
        estimatedRows: 0,
        size: table.table_size,
      }));
    }

    // 解析PostgreSQL版本信息
    const versionString = versionResult[0]?.version || '';
    const versionMatch = versionString.match(/PostgreSQL (\d+\.\d+)/);
    const postgresqlVersion = versionMatch ? versionMatch[1] : 'Unknown';

    const databaseInfo = {
      success: true,
      data: {
        // 基础信息
        database: {
          name: databaseResult[0]?.current_database || 'Unknown',
          version: postgresqlVersion,
          fullVersion: versionString,
          size: sizeResult[0]?.database_size || 'Unknown',
          currentUser: userResult[0]?.current_user || 'Unknown',
          currentTime: timestampResult[0]?.now || new Date(),
        },
        // 连接信息
        connection: {
          applicationName: connectionResult[0]?.application_name || 'Unknown',
          clientAddress: connectionResult[0]?.client_addr || 'Unknown',
          connectionStart: connectionResult[0]?.backend_start || null,
          state: connectionResult[0]?.state || 'Unknown',
        },
        // 表统计信息
        statistics: {
          totalTables: Number(tableStatsResult[0]?.table_count) || 0,
          userTables: tableRowCounts.length,
        },
        // 用户表详情
        tables: tableRowCounts,
        // Prisma 信息
        prisma: {
          version: process.env.npm_package_dependencies_prisma || 'Unknown',
          clientVersion: process.env.npm_package_dependencies_prisma_client || 'Unknown',
        },
        // 环境信息
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          architecture: process.arch,
          isDevelopment: process.env.NODE_ENV === 'development',
        },
        // 查询时间
        queriedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(databaseInfo);
  } catch (error) {
    console.error('Database info query failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve database information',
        message: error instanceof Error ? error.message : 'Unknown error',
        queriedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
