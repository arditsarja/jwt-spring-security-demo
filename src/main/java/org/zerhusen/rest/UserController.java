package org.zerhusen.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.zerhusen.AesUtil;
import org.zerhusen.Message;
import org.zerhusen.databaseservise.entity.PassowordHistory;
import org.zerhusen.databaseservise.repository.AuthorityController;
import org.zerhusen.databaseservise.repository.PassordHistoryRepository;
import org.zerhusen.databaseservise.repository.UserControoller;
import org.zerhusen.model.security.Authority;
import org.zerhusen.model.security.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
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


    ObjectMapper mapper = new ObjectMapper();

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/create_user/{authority}", method = RequestMethod.PUT)
    public String createUser(@RequestBody Message message, @PathVariable("authority") String authority) {

        String plaintext = new AesUtil().decrypt(message.getMessage());
        User user = null;
        try {
            user = mapper.readValue(plaintext, User.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        user.setLastPasswordResetDate(new Date());
        List<Authority> authorities = new ArrayList<>();
        List<User> users = new ArrayList<>();
        Authority authority1 = authorityController.findById(USER);
        users = authority1.getUsers();
        users.add(user);
        authority1.setUsers(users);
        authorities.add(authority1);
        if (authority.equals(ROLE_ADMIN)) {
            Authority authority2 = authorityController.findById(ADMIN);
            authorities.add(authority2);
            users = authority2.getUsers();
            users.add(user);
            authority2.setUsers(users);
        }
        user.setAuthorities(authorities);
        String passord = user.getPassword();
        String passordEncoder = passwordEncoder.encode(passord);
        user.setPassword(passordEncoder);
        repository.save(new PassowordHistory(user.getId(), passord, passordEncoder));
        controller.saveUser(user);

        return "DF";
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") long id) {

        User user = controller.findById(id);
        user.setPassword("ji");
        user.setAuthorities(new ArrayList<>());

        String userJson = "";
        try {
            userJson = mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        userJson = new AesUtil().encrypt(userJson);
        ResponseEntity<Message> responseEntity =
                new ResponseEntity<Message>(new Message(userJson), HttpStatus.OK);


        return responseEntity;
    }

}
