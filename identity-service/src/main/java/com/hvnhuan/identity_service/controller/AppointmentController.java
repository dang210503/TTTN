package com.hvnhuan.identity_service.controller;

import com.hvnhuan.identity_service.dto.request.ApiResponse;
import com.hvnhuan.identity_service.dto.request.AppointmentUpdateRequest;
import com.hvnhuan.identity_service.dto.request.AppoitmentCreationRequet;
import com.hvnhuan.identity_service.entity.Appointment;
import com.hvnhuan.identity_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    ApiResponse<Appointment> createAppointment(@RequestBody AppoitmentCreationRequet requet){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(appointmentService.createAppoitment(requet));
        return apiResponse;
    }

    @GetMapping
    List<Appointment> getAppointments(){
        return appointmentService.getAppointments();
    }

    @GetMapping("/{appointmentId}")
    Appointment getAppointment(@PathVariable("appointmentId") String appointmentId){
        return appointmentService.getAppoitment(appointmentId);
    }

    @PutMapping("/{appointmentId}")
    Appointment updateAppoitment(@PathVariable("appointmentId") String appointmentId, @RequestBody AppointmentUpdateRequest request){
        return appointmentService.updateAppointment(appointmentId, request);
    }

    @DeleteMapping("/{appointmentId}")
    String deleteAppointment(@PathVariable("appointmentId") String appointmentId){
        appointmentService.deleteAppointment(appointmentId);
        return "Appointment deleted";
    }
}
