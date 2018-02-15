package org.zerhusen.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.web.util.UriComponentsBuilder;
import org.zerhusen.databaseservise.repository.UserControoller;
import org.zerhusen.model.security.User;

@RestController
public class UserController {
@Autowired
UserControoller controller;
    @RequestMapping(value = "/add_user", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {

        controller.saveUser(user);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }


    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {

        User user =controller.findById(id);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
