package org.zerhusen.databaseservise.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.zerhusen.databaseservise.entity.PassowordHistory;

import javax.persistence.EntityManager;

@Repository
@Transactional
public class PassordHistoryRepository {

    @Autowired
    EntityManager em;


    public void save(PassowordHistory passowordHistory){
        em.persist(passowordHistory);
    }

}
