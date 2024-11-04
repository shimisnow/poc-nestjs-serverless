resource "aws_elasticache_cluster" "cache" {
  cluster_id           = "pns-cache"
  engine               = "redis"
  node_type            = "cache.t4g.micro"
  num_cache_nodes      = 1
  port                 = 6379
  security_group_ids   = [aws_security_group.default.id]
  
  tags = {
    Name = "POC NestJS Serverless - Redis Cluster"
  }
}
