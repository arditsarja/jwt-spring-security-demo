package org.zerhusen.databaseservise.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Student>> listAllStudents() {
        List<Student> Students = servise.getAll();
        if (Students.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
            // You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Student>>(Students, HttpStatus.OK);
    }

// -------------------Create a User-------------------------------------------

    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody Student student, UriComponentsBuilder ucBuilder) {
        logger.info("Creating User : {}", student);


        servise.save(student);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/user/{id}").buildAndExpand(student.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    // -------------------Retrieve Single Student------------------------------------------
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {

        User user =controoller.findById(id);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}





