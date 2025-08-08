# Extract the complete script section that contains the Supabase configuration and product data
with open('index.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Find the main script section containing Supabase configuration
script_start = content.find("const SUPABASE_URL = 'https://edfnhhthztskuuosuasw.supabase.co'")
if script_start != -1:
    # Find the end of this script section
    script_end = content.find('</script>', script_start)
    if script_end != -1:
        main_script = content[script_start:script_end]
        print("Main JavaScript section with Supabase configuration:")
        print(main_script)
    else:
        print("Could not find end of script section")
else:
    print("Could not find Supabase configuration")

# Also extract the bank and contact information
bank_info_start = content.find("银行名称 / Bank: Maybank")
if bank_info_start != -1:
    bank_info_end = content.find("请上传转账凭证", bank_info_start)
    if bank_info_end != -1:
        bank_info = content[bank_info_start:bank_info_end + 30]
        print("\n" + "="*50)
        print("Bank and Contact Information:")
        print(bank_info)