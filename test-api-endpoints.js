const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPIEndpoints() {
    try {
        console.log('🔍 Testing API Endpoints...\n');
        
        // Test 1: Check if server is running
        try {
            const response = await axios.get(`${API_BASE}/products`);
            console.log('❌ Server should require authentication');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ API is running and protected (401 Unauthorized)');
            } else {
                console.log('❌ Server not responding properly');
                return;
            }
        }
        
        // Test 2: Register a user
        const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
            name: 'Test User',
            email: 'test@opalmate.com',
            password: 'test123',
            role: 'admin'
        });
        
        const token = registerResponse.data.token;
        console.log('✅ User registered successfully');
        console.log('✅ JWT token received');
        
        // Test 3: Test protected endpoint with token
        const productsResponse = await axios.get(`${API_BASE}/products`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ Protected endpoint accessible with token');
        console.log(`✅ Products count: ${productsResponse.data.length}`);
        
        // Test 4: Create a product
        const productData = {
            productId: 'TEST-001',
            name: 'Test Diamond Ring',
            category: 'Ring',
            price: 50000.00,
            stock: 10,
            status: 'Active'
        };
        
        const createProductResponse = await axios.post(`${API_BASE}/products`, productData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ Product created successfully');
        console.log(`✅ Product ID: ${createProductResponse.data.id}`);
        
        // Test 5: Get the created product
        const getProductResponse = await axios.get(`${API_BASE}/products/${createProductResponse.data.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ Product retrieved successfully');
        console.log(`✅ Product name: ${getProductResponse.data.name}`);
        
        // Test 6: Update the product
        const updateData = { stock: 15 };
        const updateProductResponse = await axios.put(`${API_BASE}/products/${createProductResponse.data.id}`, updateData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ Product updated successfully');
        console.log(`✅ New stock: ${updateProductResponse.data.stock}`);
        
        // Test 7: Delete the product
        await axios.delete(`${API_BASE}/products/${createProductResponse.data.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('✅ Product deleted successfully');
        
        console.log('\n🎉 ALL API TESTS PASSED!');
        console.log('✅ Backend server is running');
        console.log('✅ Database is connected');
        console.log('✅ Authentication is working');
        console.log('✅ CRUD operations are functional');
        console.log('✅ API is ready for frontend integration');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testAPIEndpoints();
