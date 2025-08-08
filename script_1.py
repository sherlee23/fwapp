# Continue reading the file to find Supabase configuration and product data
with open('index.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Look for Supabase configuration
import re

# Find Supabase configuration
supabase_pattern = r'supabaseUrl\s*=\s*[\'"]([^\'"]+)[\'"]'
supabase_key_pattern = r'supabaseKey\s*=\s*[\'"]([^\'"]+)[\'"]'

supabase_url_match = re.search(supabase_pattern, content)
supabase_key_match = re.search(supabase_key_pattern, content)

print("Supabase Configuration:")
if supabase_url_match:
    print(f"Supabase URL: {supabase_url_match.group(1)}")
if supabase_key_match:
    print(f"Supabase Key: {supabase_key_match.group(1)}")

# Look for product data structure
print("\n" + "="*50)
print("Looking for product data structure...")

# Find script sections that might contain product data
script_sections = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
for i, script in enumerate(script_sections):
    if 'product' in script.lower() or 'item' in script.lower():
        print(f"\nScript section {i+1} (contains product/item references):")
        print(script[:500] + "..." if len(script) > 500 else script)
        
# Also look for any array or object definitions that might contain product data
array_pattern = r'const\s+\w+\s*=\s*\[.*?\]'
object_pattern = r'const\s+\w+\s*=\s*\{.*?\}'

arrays = re.findall(array_pattern, content, re.DOTALL)
objects = re.findall(object_pattern, content, re.DOTALL)

print(f"\nFound {len(arrays)} arrays and {len(objects)} objects")