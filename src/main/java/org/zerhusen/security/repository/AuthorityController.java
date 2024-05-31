package org.zerhusen.security.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.zerhusen.model.security.Authority;

import javax.persistence.EntityManager;

@Repository
@Transactional
public class AuthorityController {


    @Autowired
    EntityManager em ;

    public Authority findById(Long id)
    {
        return em.find(Authority.class,id);
    }


    public void save(Authority authority){
        if(authority.getId()==null){
            em.persist(authority);
        }else{
            em.merge(authority);
        }
    }

}
