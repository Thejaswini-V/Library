import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Userpg() {
    const [prod, setProd] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [UserpgPage, setUserpgPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetch(`http://localhost:3001/books?q=${searchQuery}`)
            .then(response => response.json())
            .then(data => setProd(data))
            .catch(error => console.log("Error occurred during fetch"));
    }, [searchQuery]);

    // Logic for displaying Userpg products
    const indexOfLastItem = UserpgPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Function to format date to a standard format for comparison
    const formatDate = (dateString) => {
        // Assuming dateString is in 'YYYY-MM-DD' format
        const [year, month, day] = dateString.split('-');
        return new Date(year, month - 1, day).toISOString().substring(0, 10);
    };

    const filteredProd = prod.filter(product => {
        const formattedDate = formatDate(product.publish_date);
        return (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            formattedDate.includes(searchQuery)
        );
    });

    const UserpgItems = filteredProd.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProd.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='flex'>
            <div className='bg-blue-200 w-screen min-h-screen p-8'>
                <h1 className='text-3xl font-semibold mb-4'>Books Table</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-800 px-4 py-2 mb-4"
                />
                <table className='w-full border-collapse border border-gray-800'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-800 px-4 py-2'>Book Name</th>
                            <th className='border border-gray-800 px-4 py-2'>Author Name</th>
                            <th className='border border-gray-800 px-4 py-2'>Subject</th>
                            <th className='border border-gray-800 px-4 py-2'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserpgItems.map(product => (
                            <tr key={product.prod_id} className='hover:bg-gray-100'>
                                <td className='border border-gray-800 px-4 py-2'>{product.title}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.author}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.subject}</td>
                                <td className='border border-gray-800 px-4 py-2'>{product.publish_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        
                <div className="flex justify-center mt-4">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => setUserpgPage(number)}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                                UserpgPage === number ? 'bg-blue-700' : ''
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Userpg;
