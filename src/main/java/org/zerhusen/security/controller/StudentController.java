package org.zerhusen.security.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.zerhusen.encryption.AesUtil;
import org.zerhusen.model.Message;
import org.zerhusen.model.security.Student;
import org.zerhusen.security.repository.StudentRepository;
import org.zerhusen.security.repository.UserControoller;
import org.zerhusen.model.security.User;

import java.io.IOException;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api")
public class StudentController {

    public static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    StudentRepository servise; //Service which will do all data retrieval/manipulation work

    @Autowired
    UserControoller controoller;


    ObjectMapper mapper = new ObjectMapper();

    // -------------------Retrieve All Students---------------------------------------------
    @RequestMapping(value = "/student", method = RequestMethod.GET)
    public ResponseEntity<?> getAlStudents() {


        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(servise.getAll());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String plaintext = new AesUtil().encrypt(jsonInString);

        return new ResponseEntity<Message>(new Message(plaintext), HttpStatus.OK);
    }


// -------------------Create a User-------------------------------------------


    @RequestMapping(value = "/student", method = RequestMethod.POST)
    public ResponseEntity<?> createStudent(@RequestBody Message studentJson, UriComponentsBuilder ucBuilder) {

        String plaintext = new AesUtil().decrypt(studentJson.getMessage());
        try {
            Student student = mapper.readValue(plaintext, Student.class);
            servise.save(student);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Message>(new Message("hihihi"), HttpStatus.OK);
    }

    // -------------------Retrieve Single Student------------------------------------------
    @RequestMapping(value = "/student/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(servise.findById(id));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        String plaintext = new AesUtil().encrypt(jsonInString);

        return new ResponseEntity<Message>(new Message(plaintext), HttpStatus.OK);
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










