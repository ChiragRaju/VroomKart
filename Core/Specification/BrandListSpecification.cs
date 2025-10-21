﻿using Core.Entities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class BrandListSpecification:BaseSpecification<Product, string>
    {
        public BrandListSpecification()
        {
            AddSelect(p => p.Brand);
            ApplyDistinct();
        }
    }
}
