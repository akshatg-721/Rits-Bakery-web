'use client'

import { Search, User, ShoppingCart } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-[#FDF2F4]">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Left Navigation */}
        <nav className="flex gap-8">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Shop
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Contact us
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Our Story
          </a>
        </nav>

        {/* Center Logo */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-serif text-gray-900">The Rits Baker</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Search size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <User size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ShoppingCart size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  )
}
