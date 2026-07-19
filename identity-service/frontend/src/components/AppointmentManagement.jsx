import React, { useState, useEffect } from 'react'
import { appointmentAPI, userAPI } from '../services/api'
import './Management.css'

function AppointmentManagement() {
  const [appointments, setAppointments] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    date: '',
    time: '',
    patientId: '',
    doctorId: '',
    status: 'SCHEDULED'
  })

  useEffect(() => {
    loadAppointments()
    loadUsers()
  }, [])

  const loadAppointments = async () => {
    setLoading(true)
    try {
      const response = await appointmentAPI.getAll()
      setAppointments(response.data)
    } catch (error) {
      alert('Lỗi khi tải danh sách lịch khám: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await userAPI.getAll()
      setUsers(response.data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingAppointment) {
        await appointmentAPI.update(editingAppointment.id, formData)
      } else {
        await appointmentAPI.create(formData)
      }
      loadAppointments()
      resetForm()
      alert(editingAppointment ? 'Cập nhật thành công!' : 'Thêm mới thành công!')
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment)
    setFormData({
      title: appointment.title || '',
      detail: appointment.detail || '',
      date: appointment.date || '',
      time: appointment.time || '',
      patientId: appointment.patientId || '',
      doctorId: appointment.doctorId || '',
      status: appointment.status || 'SCHEDULED'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch khám này?')) return
    try {
      await appointmentAPI.delete(id)
      loadAppointments()
      alert('Xóa thành công!')
    } catch (error) {
      alert('Lỗi khi xóa: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      detail: '',
      date: '',
      time: '',
      patientId: '',
      doctorId: '',
      status: 'SCHEDULED'
    })
    setEditingAppointment(null)
    setShowForm(false)
  }

  const getStatusLabel = (status) => {
    const labels = {
      'SCHEDULED': 'Đã đặt',
      'COMPLETED': 'Hoàn thành',
      'CANCELLED': 'Đã hủy'
    }
    return labels[status] || status
  }

  const getStatusClass = (status) => {
    const classes = {
      'SCHEDULED': 'badge-info',
      'COMPLETED': 'badge-success',
      'CANCELLED': 'badge-danger'
    }
    return classes[status] || 'badge-info'
  }

  const getUserName = (userId) => {
    if (!userId) return '-'
    const user = users.find(u => u.id === userId)
    return user ? `${user.firstName} ${user.lastName}` : '-'
  }

  const patients = users.filter(u => u.role === 'PATIENT')
  const doctors = users.filter(u => u.role === 'DOCTOR')

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>📅 Quản Lý Lịch Khám</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✖ Đóng' : '+ Thêm Mới'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingAppointment ? 'Chỉnh Sửa' : 'Thêm Mới'} Lịch Khám</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Chi tiết</label>
                <textarea
                  value={formData.detail}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Ngày khám *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Giờ khám *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bệnh nhân *</label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                  required
                >
                  <option value="">Chọn bệnh nhân</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName} ({patient.username})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Bác sĩ *</label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                  required
                >
                  <option value="">Chọn bác sĩ</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName} ({doctor.username})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Trạng thái *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  required
                >
                  <option value="SCHEDULED">Đã đặt</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingAppointment ? 'Cập nhật' : 'Thêm mới'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Bệnh nhân</th>
                <th>Bác sĩ</th>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td><strong>{appointment.title}</strong></td>
                    <td>{getUserName(appointment.patientId)}</td>
                    <td>{getUserName(appointment.doctorId)}</td>
                    <td>{appointment.date || '-'}</td>
                    <td>{appointment.time || '-'}</td>
                    <td>
                      <span className={`badge ${getStatusClass(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(appointment)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AppointmentManagement

