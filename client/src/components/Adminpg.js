import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Adminpg() {
  const [prod, setProd] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [UserpgPage, setUserpgPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    publish_date: '',
  });
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/books?q=${searchQuery}&_sort=${sortBy}&_order=${sortOrder}`)
      .then(response => response.json())
      .then(data => {
        setProd(data);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error occurred during fetch");
        setLoading(false);
      });
  }, [searchQuery, sortBy, sortOrder]);

  const indexOfLastItem = UserpgPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('BCE')) return dateString;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toISOString().substring(0, 10);
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

  const sortedProd = sortBy ? [...filteredProd].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  }) : filteredProd;

  const UserpgItems = sortedProd.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedProd.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleAddNewClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      const data = await response.json();
      alert(data.message);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookdata/${bookId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      const updatedProd = prod.filter(book => book.id !== bookId);
      setProd(updatedProd);
      setDeleteConfirmation(null);
      alert('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold mb-4 text-center'>Books Management</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full mr-4 focus:outline-none focus:ring focus:border-blue-400"
          />
          <button onClick={handleAddNewClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400">Add New Book</button>
        </div>
        <table className='w-full border-collapse border border-gray-800'>
          <thead className='bg-gray-200'>
            <tr>
              <th onClick={() => handleSort('title')} className={`border border-gray-800 px-4 py-2 cursor-pointer ${sortBy === 'title' ? 'bg-blue-200' : ''}`}>Book Name {sortBy === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('author')} className={`border border-gray-800 px-4 py-2 cursor-pointer ${sortBy === 'author' ? 'bg-blue-200' : ''}`}>Author {sortBy === 'author' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('subject')} className={`border border-gray-800 px-4 py-2 cursor-pointer ${sortBy === 'subject' ? 'bg-blue-200' : ''}`}>Subject {sortBy === 'subject' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('publish_date')} className={`border border-gray-800 px-4 py-2 cursor-pointer ${sortBy === 'publish_date' ? 'bg-blue-200' : ''}`}>Publish Date {sortBy === 'publish_date' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th className='border border-gray-800 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className='border border-gray-800 px-4 py-2 text-center'>Loading...</td>
              </tr>
            ) : (
              UserpgItems.map(book => (
                <tr key={book.id} className='hover:bg-gray-100'>
                  <td className='border border-gray-800 px-4 py-2'>{book.title}</td>
                  <td className='border border-gray-800 px-4 py-2'>{book.author}</td>
                  <td className='border border-gray-800 px-4 py-2'>{book.subject}</td>
                  <td className='border border-gray-800 px-4 py-2'>{book.publish_date}</td>
                  <td className='border border-gray-800 px-4 py-2'>
                    <button onClick={() => setDeleteConfirmation(book.id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md focus:outline-none focus:ring focus:border-red-400'>Delete</button>
                    {deleteConfirmation === book.id && (
                      <span className="ml-2">
                        <button onClick={() => handleDelete(book.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md focus:outline-none focus:ring focus:border-green-400">Confirm</button>
                        <button onClick={() => setDeleteConfirmation(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-md focus:outline-none focus:ring focus:border-gray-400">Cancel</button>
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setUserpgPage(number)}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-400 ${UserpgPage === number ? 'bg-blue-600' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
        {showForm && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block font-semibold">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="author" className="block font-semibold">Author:</label>
                  <input
                    type="text"
                    id="author"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block font-semibold">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="publish_date" className="block font-semibold">Publish Date:</label>
                  <input
                    type="text"
                    id="publish_date"
                    className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400">Submit</button>
                  <button type="button" onClick={handleCloseForm} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-4 focus:outline-none focus:ring focus:border-gray-400">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Adminpg;
