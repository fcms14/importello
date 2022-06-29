# Requirements
> PHP
> MySQL

>>   CREATE TABLE clients (
>>   	id INT(255) NOT NULL AUTO_INCREMENT,
>>   	name VARCHAR(255) NOT NULL DEFAULT 'mr client',
>>   	document VARCHAR(255) NOT NULL DEFAULT '13245678910',
>>   	dateCreated DATETIME NOT NULL DEFAULT NOW(),
>>   	PRIMARY KEY (id)
>>   );

>>   CREATE TABLE `shipping` (
>>     `id` int(255) NOT NULL AUTO_INCREMENT,
>>     `idClient` int(255) NOT NULL,
>>     `description` varchar(255) NOT NULL DEFAULT 'shipping description',
>>     `price` double NOT NULL DEFAULT 10,
>>     `dateCreated` datetime NOT NULL DEFAULT current_timestamp(),
>>     `idBulkInsert` int(11) NOT NULL,
>>     PRIMARY KEY (`id`),
>>     KEY `idClient` (`idClient`),
>>     CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `clients` (`id`)
>>   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# View results (time spent on tasks)
>>   SELECT 
>>   	TIMEDIFF(max(dateCreated), min(dateCreated)) AS timeSpent,
>>   	count(*) AS rowsInserted,
>>       idBulkInsert
>>   FROM shipping 
>>   group by idBulkInsert 
>>   order by timeSpent;
