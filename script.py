# Read the index.html file to understand its structure and content
with open('index.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Print the first 2000 characters to understand the structure
print("First 2000 characters of index.html:")
print(content[:2000])
print("\n" + "="*50)
print("File length:", len(content))