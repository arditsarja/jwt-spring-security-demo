package org.zerhusen.databaseservise.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class PassowordHistory {

    @Id
    @GeneratedValue
    Long id;

    Long userID;
    String password;
    String passwordEnxrypted;

    public PassowordHistory() {
    }

    public PassowordHistory(Long userID, String password, String passwordEnxrypted) {
        this.userID = userID;
        this.password = password;
        this.passwordEnxrypted = passwordEnxrypted;
    }

    public Long getId() {
        return id;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordEnxrypted() {
        return passwordEnxrypted;
    }

    public void setPasswordEnxrypted(String passwordEnxrypted) {
        this.passwordEnxrypted = passwordEnxrypted;
    }
}
