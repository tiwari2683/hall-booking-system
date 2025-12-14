const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Connecting to database...');
    
    // Test the connection
    await prisma.$connect();
    console.log('Successfully connected to the database');
    
    // Check if Booking table exists and has data
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'Booking'
        ) as "exists"
      `;
      
      if (tableExists[0].exists) {
        console.log('✅ Booking table exists');
        
        // Count bookings
        const count = await prisma.booking.count();
        console.log(`📊 Number of bookings: ${count}`);
        
        // Get first 5 bookings
        if (count > 0) {
          const bookings = await prisma.booking.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              hallName: true,
              bookingDate: true,
              startTime: true,
              endTime: true,
              customerName: true,
              customerEmail: true,
              status: true,
              createdAt: true
            }
          });
          console.log('\nRecent bookings:');
          console.table(bookings);
        }
      } else {
        console.log('❌ Booking table does not exist');
      }
    } catch (error) {
      console.error('Error checking Booking table:', error.message);
    }
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    if (error.code === 'P1012') {
      console.log('\n💡 It looks like your database schema might not be up to date.');
      console.log('Try running: npx prisma db push');
    } else if (error.code === 'P1001') {
      console.log('\n🔒 Cannot connect to the database. Please check your connection string.');
      console.log('Make sure your database server is running and accessible.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
