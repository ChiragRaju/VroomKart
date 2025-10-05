using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;

        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;

        }
        private List<string> brands = [];
        public List<string> Brands
        {
            get => brands;
            set 
                {
                brands = value.SelectMany(b => b.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }
        private List<string> types = [];
        public List<string> Types
        {
            get => types;
            set
            {
                types = value.SelectMany(b => b.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
            }
        }

        public string? Sort { get; set; }

        private string? _search;
        public string Search
        {
            get => _search ?? "";
            set => _search = value?.ToLower();
        }


    }
}
