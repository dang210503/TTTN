package com.hvnhuan.identity_service.service;

import com.hvnhuan.identity_service.dto.request.AppointmentUpdateRequest;
import com.hvnhuan.identity_service.dto.request.AppoitmentCreationRequet;
import com.hvnhuan.identity_service.entity.Appointment;
import com.hvnhuan.identity_service.exception.AppException;
import com.hvnhuan.identity_service.exception.ErrorCode;
import com.hvnhuan.identity_service.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppoitment(AppoitmentCreationRequet requet){
        Appointment appointment = new Appointment();
        if(appointmentRepository.existsByTitle(requet.getTitle())){
            throw new AppException(ErrorCode.APPOINTMENT_EXITED);
        }
        appointment.setTitle(requet.getTitle());
        appointment.setDetail(requet.getDetail());
        appointment.setDate(requet.getDate());
        appointment.setTime(requet.getTime());
        appointment.setPatientId(requet.getPatientId());
        appointment.setDoctorId(requet.getDoctorId());
        appointment.setStatus(requet.getStatus() != null ? requet.getStatus() : "SCHEDULED");

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointments(){
        return appointmentRepository.findAll();
    }

    public Appointment getAppoitment(String id){
        return appointmentRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Not found appointment!"));
    }

    public Appointment updateAppointment(String id, AppointmentUpdateRequest request){
        Appointment appointment = getAppoitment(id);
        if(request.getTitle() != null) appointment.setTitle(request.getTitle());
        if(request.getDetail() != null) appointment.setDetail(request.getDetail());
        if(request.getDate() != null) appointment.setDate(request.getDate());
        if(request.getTime() != null) appointment.setTime(request.getTime());
        if(request.getPatientId() != null) appointment.setPatientId(request.getPatientId());
        if(request.getDoctorId() != null) appointment.setDoctorId(request.getDoctorId());
        if(request.getStatus() != null) appointment.setStatus(request.getStatus());

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(String id){
        appointmentRepository.deleteById(id);
    }
}
