const express = require('express');
const app = express();
const port = 3000;

const allProducts = [
    {
        id: 1,
        name: "Laptop",
        price: 200000,
        description: "A powerful laptop for work and study."
    },
    {
        id: 2,
        name: "Smartphone",
        price: 450000,
        description: "A modern smartphone with a high-quality camera."
    },
    {
        id: 3,
        name: "Headphones",
        price: 15000,
        description: "Wireless headphones with clear sound and deep bass."
    },
    {
        id: 4,
        name: "Keyboard",
        price: 10000,
        description: "A comfortable mechanical keyboard for typing and gaming."
    }
];

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        status: true,
        message: "Welcome to node class"
    });
});

app.get('/products', (req, res)=>{
    res.status(200).json({
        status: true,
        message: "All products fetched",
        data: allProducts
    });
});

app.get('/products/:id', (req, res)=>{
    const { id } = req.params;
    const product = allProducts.find(
        product => product.id === Number(id)
    );


    if(!product){
        res.status(404).json({
            status: false,
            message: "product not found"
        });
        return;
    }

    res.status(200).json({
        status: true,
        message: "Product successfully fetched",
        data: product
    })
});

app.post('/create', (req, res)=>{
    const { name, price, description } = req.body;

    if(!name || !price || !description){
        res.status(404).json({
            status: false,
            message: "No product added, pls fill all fields"
        });
        return;
    }

    allProducts.push({
        id: allProducts.length + 1,
        name,
        price,
        description
    })

    res.status(200).json({
        status: true,
        message: "product added successfully"
    })
})

app.patch('/update-product/:id', (req, res)=>{
    const { id } = req.params;
    const { name, price, description} = req.body;
    const indexOfProduct = allProducts.findIndex(
        product => product.id === Number(id)
    );


    if(indexOfProduct === -1){
        res.status(404).json({
            status: false,
            message: "product not found"
        });
        return;
    }

  
    allProducts[indexOfProduct].name = name ?? allProducts[indexOfProduct].name;
    allProducts[indexOfProduct].price = price ?? allProducts[indexOfProduct].price;
    allProducts[indexOfProduct].description = description ?? allProducts[indexOfProduct].description;

    res.status(200).json({
        status: true,
        message: "product updated successfully",
        data: allProducts[indexOfProduct]
    })
})

app.put('/update-product/:id', (req, res)=>{
    const { id } = req.params;
    const { name, price, description} = req.body;
    const indexOfProduct = allProducts.findIndex(
        product => product.id === Number(id)
    );


    if(indexOfProduct === -1){
        res.status(404).json({
            status: false,
            message: "product not found"
        });
        return;
    }


    allProducts[indexOfProduct].name = name;
    allProducts[indexOfProduct].price = price;
    allProducts[indexOfProduct].description = description;

    res.status(200).json({
        status: true,
        message: "product updated successfully",
        data: allProducts[indexOfProduct]
    })
})

app.delete('/delete/:id', (req, res)=>{
    const { id } = req.params;
    const indexOfProduct = allProducts.findIndex(
        product => product.id === Number(id)
    )

    if(indexOfProduct === -1){
        res.status(404).json({
            status: false,
            message: "No product deleted"
        });
        return;
    }

    allProducts.splice(indexOfProduct, 1)

    res.status(200).json({
        status: true,
        message: "product successfully deleted",
        data: allProducts
    })
})



app.use((req, res)=>{
    res.status(404).json({
        status: false,
        message: "Page not found"
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});