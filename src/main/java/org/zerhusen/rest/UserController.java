package org.zerhusen.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import org.zerhusen.databaseservise.entity.PassowordHistory;
import org.zerhusen.databaseservise.repository.AuthorityController;
import org.zerhusen.databaseservise.repository.PassordHistoryRepository;
import org.zerhusen.databaseservise.repository.UserControoller;
import org.zerhusen.model.security.Authority;
import org.zerhusen.model.security.User;
import org.zerhusen.security.JwtAuthenticationRequest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class UserController {
    private static final Long ADMIN = 2l;
    private static final Long USER = 1l;
    private static final String ROLE_ADMIN = "ROLE_ADMIN";

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    UserControoller controller;

    @Autowired
    PassordHistoryRepository repository;


    @Autowired
    AuthorityController authorityController;

    //    @WithMockUser(roles = "ADMIN")
    @RequestMapping(value = "/create_user/{authority}", method = RequestMethod.PUT)
    public String createUser(@RequestBody User user, @PathVariable("authority") String authority) {

        user.setLastPasswordResetDate(new Date());
        List<Authority> authorities = new ArrayList<>();
        Authority authority1 = authorityController.findById(USER);
        authorities.add(authority1);
        if (authority.equals(ROLE_ADMIN)) {
            Authority authority2 = authorityController.findById(ADMIN);
            authorities.add(authority2);
        }
        String passord = user.getPassword();
        String passordEncoder = passwordEncoder.encode(passord);
        user.setPassword(passordEncoder);
        repository.save(new PassowordHistory(user.getId(),passord,passordEncoder));
        controller.saveUser(user);

        return "DF";
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {

        User user = controller.findById(id);
        user.setPassword("ji");
        user.setAuthorities(new ArrayList<>());

        ResponseEntity<User> responseEntity =
                new ResponseEntity<User>(user, HttpStatus.OK);


        return responseEntity;
    }

}
