package org.zerhusen.security.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.zerhusen.encryption.AesUtil;
import org.zerhusen.model.Message;
import org.zerhusen.security.JwtAuthenticationRequest;
import org.zerhusen.security.JwtTokenUtil;
import org.zerhusen.security.JwtUser;
import org.zerhusen.security.service.JwtAuthenticationResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
public class AuthenticationRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "${jwt.route.authentication.path}", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Message message, Device device) throws AuthenticationException {

        String plaintext = new AesUtil().decrypt(message.getMessage());


        // Perform the security
        JwtAuthenticationRequest authenticationRequest = null;
        try {
            authenticationRequest = mapper.readValue(plaintext, JwtAuthenticationRequest.class);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Message("error"));
        }
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails, device);
        String tokenJson = "";
        try {
            tokenJson = mapper.writeValueAsString(new JwtAuthenticationResponse(token));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        tokenJson = new AesUtil().encrypt(tokenJson);
        // Return the token
        return ResponseEntity.ok(new Message(tokenJson));
    }

    @RequestMapping(value = "${jwt.route.authentication.refresh}", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            String tokenJson = "";
            try {
                tokenJson = mapper.writeValueAsString(new JwtAuthenticationResponse(refreshedToken));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            tokenJson = new AesUtil().encrypt(tokenJson);
            return ResponseEntity.ok(new Message(tokenJson));
        } else {
            return ResponseEntity.badRequest().body(new Message("Error"));
        }
    }

}
