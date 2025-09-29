using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly StoreContext _context;
    public ProductRepository(StoreContext context)
    {
        _context = context;
    }
    public void AddProduct(Product product)
    {
       _context.Products.Add(product);
    }

    public void DeleteProduct(Product product)
    {
        _context.Products.Remove(product);
    }

    public async Task<IReadOnlyList<string>> GetBrandsAsync()
    {
       return await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync(); 
    }

    public async Task<Product?> GetProductById(int id)
    {
        return await _context.Products.FindAsync(id);
    }

   

    public async Task<IReadOnlyList<Product>> GetProductsAsync(string? brands=null, string? types=null, string? sort=null)
    {
        var query=_context.Products.AsQueryable();
        if(!string.IsNullOrEmpty(brands))
        {
            query=query.Where(p=>p.Brand==brands);
        }
        if (!string.IsNullOrWhiteSpace(types))
        {
            query=query.Where(p=>p.Type==types);
        }
        
        
            query=sort.ToLower() switch
            {
                "priceAsc"=>query.OrderBy(p=>p.Price),
                "priceDesc"=>query.OrderByDescending(p=>p.Price),
                _=>query.OrderBy(p=>p.Name)
            };
        
        return await query.ToListAsync();
    }

    public async Task<IReadOnlyList<string>> GetTypesAsync()
    {
       return await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();
    }

    public bool ProductExists(int id)
    {
        return _context.Products.Any(p => p.Id == id);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync()>0;
    }

    public void Update(Product product)
    {
        _context.Entry(product).State = EntityState.Modified;
    }
}
