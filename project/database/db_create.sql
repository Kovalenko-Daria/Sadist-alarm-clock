-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`motivational_phrase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`motivational_phrase` (
  `idphrase` INT NOT NULL AUTO_INCREMENT,
  `phrase` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idphrase`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `login` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`alarm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`alarm` (
  `idalarm` INT NOT NULL AUTO_INCREMENT,
  `time_end` DATETIME NULL,
  `time_start` DATETIME NULL,
  `task_type` ENUM("math", "logic") NULL,
  `task_level` ENUM("hard", "easy") NULL,
  `motivational_phrase_idphrase` INT NOT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idalarm`),
  INDEX `fk_alarm_motivational_phrase1_idx` (`motivational_phrase_idphrase` ASC) VISIBLE,
  INDEX `fk_alarm_user1_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_alarm_motivational_phrase1`
    FOREIGN KEY (`motivational_phrase_idphrase`)
    REFERENCES `mydb`.`motivational_phrase` (`idphrase`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_alarm_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `mydb`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`music` (
  `idmusic` INT NOT NULL AUTO_INCREMENT,
  `music_url` VARCHAR(200) NULL,
  `music_name` VARCHAR(200) NULL,
  `type` ENUM("rock", "calm") NULL,
  PRIMARY KEY (`idmusic`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`m2m_alarm_music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`m2m_alarm_music` (
  `alarm_idalarm` INT NOT NULL,
  `music_idmusic` INT NOT NULL,
  PRIMARY KEY (`alarm_idalarm`, `music_idmusic`),
  INDEX `fk_m2m_alarm_music_alarm1_idx` (`alarm_idalarm` ASC) VISIBLE,
  INDEX `fk_m2m_alarm_music_music1_idx` (`music_idmusic` ASC) VISIBLE,
  CONSTRAINT `fk_m2m_alarm_music_alarm1`
    FOREIGN KEY (`alarm_idalarm`)
    REFERENCES `mydb`.`alarm` (`idalarm`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m2m_alarm_music_music1`
    FOREIGN KEY (`music_idmusic`)
    REFERENCES `mydb`.`music` (`idmusic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`task` (
  `idtask` INT NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(512) NULL,
  `type` ENUM("math", "logic") NULL,
  `level` ENUM("hard", "easy") NULL,
  PRIMARY KEY (`idtask`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`m2m_alarm_task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`m2m_alarm_task` (
  `idm2m_alarm_task` INT NOT NULL AUTO_INCREMENT,
  `alarm_idalarm` INT NOT NULL,
  `task_idtask` INT NOT NULL,
  `correct_answ` TINYINT NULL,
  INDEX `fk_m2m_alarm_task_alarm_idx` (`alarm_idalarm` ASC) VISIBLE,
  INDEX `fk_m2m_alarm_task_task1_idx` (`task_idtask` ASC) VISIBLE,
  PRIMARY KEY (`idm2m_alarm_task`),
  CONSTRAINT `fk_m2m_alarm_task_alarm`
    FOREIGN KEY (`alarm_idalarm`)
    REFERENCES `mydb`.`alarm` (`idalarm`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m2m_alarm_task_task1`
    FOREIGN KEY (`task_idtask`)
    REFERENCES `mydb`.`task` (`idtask`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`answer` (
  `idanswer` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(45) NULL,
  `correctness` TINYINT NULL,
  `task_idtask` INT NOT NULL,
  PRIMARY KEY (`idanswer`),
  INDEX `fk_answer_task1_idx` (`task_idtask` ASC) VISIBLE,
  CONSTRAINT `fk_answer_task1`
    FOREIGN KEY (`task_idtask`)
    REFERENCES `mydb`.`task` (`idtask`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
