package asi.rest.controllers;

import asi.model.entities.Schedule;
import asi.model.services.ScheduleService;
import asi.rest.dtos.ScheduleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.findAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long scheduleId) {
        Schedule schedule = scheduleService.findScheduleById(scheduleId).get();
        return ResponseEntity.ok(schedule);
    }

    @PostMapping("/create")
    public ResponseEntity<Schedule> createSchedule(@ModelAttribute ScheduleDto scheduleDto) {
        Schedule newSchedule = new Schedule();
        newSchedule.setStartTime(scheduleDto.getStart_time());
        newSchedule.setEndTime(scheduleDto.getEnd_time());
        newSchedule.setClassroom(scheduleDto.getClassroom());
        Schedule.WeekDay day = Schedule.WeekDay.values()[scheduleDto.getWeekDay()];
        newSchedule.setWeekDay(day);

        if (scheduleDto.getEnd_time().before(scheduleDto.getStart_time())) {
            throw new RuntimeException();
        }

        // Call the service method to save the new Schedule
        return ResponseEntity.ok(scheduleService.createSchedule(newSchedule));
    }

}
