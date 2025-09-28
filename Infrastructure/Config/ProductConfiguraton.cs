using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class ProductConfiguraton : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Id).HasColumnType("int").IsRequired();
        builder.Property(p => p.Name).IsRequired();
        builder.Property(p => p.Description).HasColumnType("nvarchar(500)").IsRequired();
        builder.Property(p => p.Price).HasColumnType("decimal(18,2)").IsRequired();
    
    }
}
