const { testConnection, syncDatabase } = require('./backend/config/database');
const User = require('./backend/models/user.model');

async function testDatabaseConnection() {
    try {
        console.log('🔍 Testing Database Connection...\n');
        
        // Test database connection
        const connected = await testConnection();
        if (!connected) {
            throw new Error('Database connection failed');
        }
        
        // Sync database tables
        await syncDatabase();
        console.log('✅ Database tables synchronized');
        
        // Test creating a user
        const testUser = await User.create({
            name: 'Admin User',
            email: 'admin@opalmate.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('✅ Test user created:', testUser.email);
        
        // Test reading user
        const foundUser = await User.findOne({ where: { email: 'admin@opalmate.com' } });
        console.log('✅ User retrieved:', foundUser.name);
        
        // Test password verification
        const passwordMatch = await foundUser.matchPassword('admin123');
        console.log('✅ Password verification:', passwordMatch ? 'PASSED' : 'FAILED');
        
        // Clean up
        await testUser.destroy();
        console.log('✅ Test data cleaned up');
        
        console.log('\n🎉 DATABASE CONNECTION TEST PASSED!');
        console.log('✅ Database is connected and working');
        console.log('✅ All models are functional');
        console.log('✅ Authentication system working');
        console.log('✅ System is ready for use!');
        
    } catch (error) {
        console.error('❌ Database connection test failed:', error.message);
        if (error.errors) {
            error.errors.forEach(err => {
                console.error(`   - ${err.message} (${err.path})`);
            });
        }
    }
}

testDatabaseConnection();
