CREATE TABLE `auth_orderly`.`users` (`uid` VARCHAR(255) NOT NULL , `firstname` VARCHAR(50)  , `lastname` VARCHAR(50) , `email` VARCHAR(255) NOT NULL  , `password` VARCHAR(255) NOT NULL , `status` VARCHAR(50)  , `image_profile_url` VARCHAR(255) , `phone_number` VARCHAR(50)  , `favorites_products`  , PRIMARY KEY (`uid`), UNIQUE `unique` (`email`)) ENGINE = InnoDB;
CREATE TABLE `auth_orderly`.`Companies` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `company_email` VARCHAR(255),
    `rate` DECIMAL(2,1),
    `rate_number` INT,
    `categories` VARCHAR(255),
    `address` VARCHAR(255),
    `wilaya` VARCHAR(255),
    `registersDeCommerce` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;