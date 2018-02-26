package org.zerhusen.databaseservise.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;
import org.zerhusen.databaseservise.entity.Student;
import org.zerhusen.databaseservise.repository.StudentRepository;
import org.zerhusen.databaseservise.repository.UserControoller;
import org.zerhusen.model.security.User;

import java.util.List;


@RestController
@RequestMapping("/api")
public class StudentController {

    public static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    StudentRepository servise; //Service which will do all data retrieval/manipulation work

    @Autowired
    UserControoller controoller;





    @RequestMapping(value = "/createOne")
    public void createOne() {
        servise.save(new Student("Ardit", "Sarja", "sta them"));
    }

    // -------------------Retrieve All Students---------------------------------------------

    @RequestMapping(value = "/student", method = RequestMethod.GET)
    public ResponseEntity<List<Student>> listAllStudents() {
        List<Student> Students = servise.getAll();
        if (Students.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Student>>(Students, HttpStatus.OK);
    }

// -------------------Create a User-------------------------------------------

    @RequestMapping(value = "/student", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody Student student, UriComponentsBuilder ucBuilder) {
        logger.info("Creating User : {}", student);
        servise.save(student);
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    // -------------------Retrieve Single Student------------------------------------------
    @RequestMapping(value = "/student/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {

        Student student =servise.findById(id);

        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    // ------------------- Delete a User-----------------------------------------

    @RequestMapping(value = "/student/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        logger.info("Fetching & Deleting User with id {}", id);

        Student student = servise.findById(id);
        if (student == null) {
            logger.error("Unable to delete. User with id {} not found.", id);
            return new ResponseEntity(new String("Unable to delete. User with id " + id + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        servise.deleteById(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    // ------------------- Delete All Users-----------------------------

    @RequestMapping(value = "/student", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteAllUsers() {
        logger.info("Deleting All Users");

        servise.deleteAllStudents();
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }
}










