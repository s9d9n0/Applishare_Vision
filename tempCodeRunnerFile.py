df = pd.DataFrame(page_index)['domaineFonctionnel'].apply(pd.Series)
# print(df)

# df_3 = pd.json_normalize(page_index)
# print(df_3)

# df_3.to_csv('df_Oscar.csv', sep=';', index=False)