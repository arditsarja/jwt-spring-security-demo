package org.zerhusen.security.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.zerhusen.model.security.Authority;
import org.zerhusen.model.security.User;
import org.zerhusen.security.JwtUser;
import org.zerhusen.security.JwtUserFactory;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class UserControoller {


    @Autowired
    EntityManager em;


    public void saveUser(User user) {

        if (user.getId() == null) {
            em.persist(user);
        } else {
            em.merge(user);
        }

    }


    public User findById(Long id) {
        return em.find(User.class, id);
    }

    

//    public User findByUsername(String name) {
//
//        Query query = em.find(User.class,id);
//    }
}
