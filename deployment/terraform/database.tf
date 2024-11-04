resource "aws_db_instance" "database" {
  identifier             = "pns-database"
  engine                 = "postgres"
  engine_version         = "16.4"
  instance_class         = "db.t3.micro"
  storage_type           = "gp2"
  allocated_storage      = 20
  username               = "postgres"
  password               = "1234567890"
  db_name                = "authentication"
  vpc_security_group_ids = [aws_security_group.default.id]
  skip_final_snapshot    = true

  tags = {
    Name = "POC NestJS Serverless - PostgreSQL"
  }
}
