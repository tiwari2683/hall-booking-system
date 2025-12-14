import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiMapPin, FiCheck, FiX, FiAlertCircle, FiLoader } from 'react-icons/fi';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    bookingDate: '',
    startTime: '',
    endTime: '',
    hallName: '',
  });

  // Mock data for demonstration - updated to match backend structure
  useEffect(() => {
    const mockBookings = [
      {
        id: '1',
        customerName: 'Mohit',
        email: 'mohitpatil.coe@gmail.com',
        phone: '7977001670',
        bookingDate: '2024-12-20',
        startTime: '09:00',
        endTime: '17:00',
        hallName: 'Budhavihar',
        status: 'Confirm',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        customerName: 'SONU RAV',
        email: 'sonu@123gmail.com',
        phone: '9819688606',
        bookingDate: '2024-12-25',
        startTime: '10:00',
        endTime: '18:00',
        hallName: 'Nagarbhavan',
        status: 'Confirm',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        customerName: 'Mahesh dashade',
        email: 'mahesh@example.com',
        phone: '9876543210',
        bookingDate: '2024-12-28',
        startTime: '14:00',
        endTime: '22:00',
        hallName: 'Padmabhusan Dr Appasaheb Dharmadhikari Sabhagruha',
        status: 'Pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        customerName: 'Deepak Shantaram Jagtap',
        email: 'deepak@example.com',
        phone: '9123456789',
        bookingDate: '2024-12-30',
        startTime: '09:00',
        endTime: '23:59',
        hallName: 'Budhavihar',
        status: 'Confirm',
        createdAt: new Date().toISOString(),
      }
    ];
    
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    } else if (formData.customerName.length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    
    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    } else {
      const bookingDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (bookingDate < today) {
        newErrors.bookingDate = 'Booking date must be today or in the future';
      }
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    if (!formData.hallName) {
      newErrors.hallName = 'Please select a hall';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSuccess('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingBooking) {
        // Update existing booking
        setBookings(prev => prev.map(booking => 
          booking.id === editingBooking.id 
            ? { ...formData, id: editingBooking.id }
            : booking
        ));
        setSuccess('Booking updated successfully!');
      } else {
        // Add new booking
        const newBooking = {
          ...formData,
          id: Date.now().toString(),
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        setBookings(prev => [newBooking, ...prev]);
        setSuccess('Booking created successfully!');
      }

      // Reset form
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        bookingDate: '',
        startTime: '',
        endTime: '',
        hallName: '',
      });
      setEditingBooking(null);
      setShowAddForm(false);
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to save booking. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData(booking);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBookings(prev => prev.filter(booking => booking.id !== id));
      setSuccess('Booking deleted successfully!');
    } catch (error) {
      setErrors({ submit: 'Failed to delete booking. Please try again.' });
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingBooking(null);
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      bookingDate: '',
      startTime: '',
      endTime: '',
      hallName: '',
    });
    setErrors({});
    setSuccess('');
  };

  const filteredBookings = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.includes(searchTerm) ||
    booking.hallName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-booking py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Hall Booking Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and track all hall bookings in one place
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <FiPlus className="mr-2" />
              Add New Booking
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or hall..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="alert alert-success mb-6 animate-slide-down">
            <div className="flex items-center">
              <FiCheck className="w-5 h-5 mr-2" />
              {success}
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="alert alert-error mb-6 animate-slide-down">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-2" />
              {errors.submit}
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="booking-card mb-8 animate-slide-up">
            <div className="booking-card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingBooking ? 'Edit Booking' : 'Add New Booking'}
              </h2>
            </div>
            <div className="booking-card-body">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.customerName ? 'form-input-error' : ''}`}
                    placeholder="Enter customer name"
                  />
                  {errors.customerName && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.customerName}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="form-label flex items-center gap-2">
                    <FiMail className="w-4 h-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    placeholder="customer@example.com"
                  />
                  {errors.email && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="form-label flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="form-label flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    Booking Date *
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`form-input ${errors.bookingDate ? 'form-input-error' : ''}`}
                  />
                  {errors.bookingDate && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.bookingDate}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="form-label flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className={`form-input ${errors.startTime ? 'form-input-error' : ''}`}
                  />
                  {errors.startTime && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.startTime}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="form-label flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className={`form-input ${errors.endTime ? 'form-input-error' : ''}`}
                  />
                  {errors.endTime && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.endTime}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="form-label flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    Hall *
                  </label>
                  <select
                    name="hallName"
                    value={formData.hallName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.hallName ? 'form-input-error' : ''}`}
                  >
                    <option value="">Select a hall</option>
                    <option value="Budhavihar">Budhavihar</option>
                    <option value="Nagarbhavan">Nagarbhavan</option>
                    <option value="Padmabhusan Dr Appasaheb Dharmadhikari Sabhagruha">Padmabhusan Dr Appasaheb Dharmadhikari Sabhagruha</option>
                  </select>
                  {errors.hallName && (
                    <div className="form-error">
                      <FiAlertCircle className="w-4 h-4" />
                      {errors.hallName}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-outline"
                    disabled={isSubmitting}
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="mr-2 animate-spin" />
                        {editingBooking ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <FiCheck className="mr-2" />
                        {editingBooking ? 'Update Booking' : 'Create Booking'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="booking-card">
          <div className="booking-card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Bookings ({filteredBookings.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiCalendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="booking-table">
              <thead>
                <tr>
                  <th className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    Customer
                  </th>
                  <th>
                    <FiMail className="w-4 h-4 inline mr-1" />
                    Email
                  </th>
                  <th>
                    <FiPhone className="w-4 h-4 inline mr-1" />
                    Phone
                  </th>
                  <th>
                    <FiCalendar className="w-4 h-4 inline mr-1" />
                    Date
                  </th>
                  <th>
                    <FiClock className="w-4 h-4 inline mr-1" />
                    Start
                  </th>
                  <th>
                    <FiClock className="w-4 h-4 inline mr-1" />
                    End
                  </th>
                  <th>
                    <FiMapPin className="w-4 h-4 inline mr-1" />
                    Hall
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <FiCalendar className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                          No bookings found
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                          {searchTerm ? 'Try adjusting your search terms' : 'Create your first booking to get started'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                            <FiUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ID: {booking.id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiMail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">{booking.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiPhone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">{booking.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {new Date(booking.bookingDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">{booking.startTime}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">{booking.endTime}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {booking.hallName.length > 20 
                              ? booking.hallName.substring(0, 20) + '...' 
                              : booking.hallName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${
                          booking.status === 'Confirm' 
                            ? 'status-confirm'
                            : booking.status === 'Cancelled'
                            ? 'status-cancelled'
                            : 'status-pending'
                        }`}>
                          {booking.status === 'Confirm' && <FiCheck className="w-3 h-3 mr-1" />}
                          {booking.status === 'Cancelled' && <FiX className="w-3 h-3 mr-1" />}
                          {booking.status === 'Pending' && <FiAlertCircle className="w-3 h-3 mr-1" />}
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(booking)}
                            className="btn-secondary p-2"
                            title="Edit booking"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="btn-danger p-2"
                            title="Delete booking"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
