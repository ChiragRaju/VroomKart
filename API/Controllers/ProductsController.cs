using System.Runtime.InteropServices.Marshalling;
using Core.Entities;
using Core.Interfaces;

using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepository;

        // private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository product, IGenericRepository<Product> productRepository)
        {
            // _productRepository = productRepository;
            _productRepository = productRepository;


        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts(string? brands = null, string? types = null, string? sort = null)
        {
            // var products = await _productRepository.GetProductsAsync(brands, types, sort);
            var products=await _productRepository.ListAllAsync();
            return Ok(products);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            // var product = await _productRepository.GetProductById(id);
            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]

        public async Task<ActionResult<Product>> CreateProduct([FromBody] Product product)
        {
            // _productRepository.AddProduct(product);
            _productRepository.Add(product);
            await _productRepository.SaveChangesAsync();


            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !_productRepository.Exists(id))
            {
                return BadRequest();
            }
            _productRepository.Update(product);
            await _productRepository.SaveChangesAsync();
            return NoContent();

        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            // var product = await _productRepository.GetProductById(id);
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _productRepository.Remove(product);
            // _productRepository.DeleteProduct(product);
            await _productRepository.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetProductBrands()
        {
            // var brands = await _productRepository.GetBrandsAsync();
            // return Ok(brands);
            return Ok();

        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetProductTypes()
        {
            // var types = await _productRepository.GetTypesAsync();
            // return Ok(types);
            return Ok();
        }

    }
}

    
