using System;
using Core.Entities;

namespace Core.Interfaces;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetProductsAsync(string? brands,string? types,string? sort);
    Task<Product?> GetProductById(int id);

    Task<IReadOnlyList<string>> GetBrandsAsync();

    Task<IReadOnlyList<string>> GetTypesAsync();

    void AddProduct(Product product);
    void Update(Product product);
    void DeleteProduct(Product product);

    bool ProductExists(int id);
    Task<bool> SaveChangesAsync();



}
