package asi.rest.dtos;

import java.sql.Time;

public class ScheduleDto {

    private Time start_time;
    private Time end_time;
    private String classroom;
    private int weekDay;

    public ScheduleDto() {
        super();
    }

    public ScheduleDto(Time start_time, Time end_time, String classroom, int weekDay) {
        this.start_time = start_time;
        this.end_time = end_time;
        this.classroom = classroom;
        this.weekDay = weekDay;
    }

    public Time getStart_time() {
        return start_time;
    }

    public void setStart_time(Time start_time) {
        this.start_time = start_time;
    }

    public Time getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Time end_time) {
        this.end_time = end_time;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public int getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(String weekDay) {
        switch (weekDay.toUpperCase()) {
            case "LUNES":
                this.weekDay = 0;
                break;
            case "MARTES":
                this.weekDay = 1;
                break;
            case "MIERCOLES":
                this.weekDay = 2;
                break;
            case "JUEVES":
                this.weekDay = 3;
                break;
            case "VIERNES":
                this.weekDay = 4;
                break;
            case "SABADO":
                this.weekDay = 5;
                break;
            case "DOMINGO":
                this.weekDay = 6;
                break;
            default:
                // En caso de un valor no reconocido, puedes asignar un valor por defecto
                this.weekDay = -1; // O cualquier otro valor que represente un valor inválido
                break;
        }
    }
}
