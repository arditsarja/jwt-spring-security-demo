package org.zerhusen.databaseservise.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.zerhusen.model.security.Authority;
import org.zerhusen.model.security.User;
import org.zerhusen.security.JwtUser;
import org.zerhusen.security.JwtUserFactory;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
public class UserControoller {


    @Autowired
    EntityManager em;


    public void saveUser(User user){

        JwtUserFactory.create(user);


//        Authority authority = em.createQuery("SELECT u from Authority u where u.AuthorityName='ROLE_USER'",Authority.class).getSingleResult();
//        List<User> userList = authority.getUsers();
//        userList.add(user);
//        authority.setUsers(userList);
//        em.merge(authority);
    }


    public User findById(Long id) {
        return em.find(User.class,id);
    }
}
