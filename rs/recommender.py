import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors

# Загружаем набор данных
establishments = pd.read_csv('establishments.csv')

# Избавляемся от ненужных столбцов
# establishments = establishments.drop(['address_id', 'establishmentID', 'description', 'picture'], axis=1)

#Заменяем True на 1 и False на 0
cols_to_replace = ['veg_positions', 'alt_brewing', 'alt_milk', 'pets', 'food', 'non_coffee_drink', 'decaf', 'wifi', 'place_for_work']
establishments[cols_to_replace] = establishments[cols_to_replace].replace({True: 1, False: 0})

# Имитируем выбор заведения пользователем
item_data = {'avg_bill':220, 'veg_positions':1, 'alt_brewing':0, 'alt_milk':1, 'pets':0, 'food':1, 'non_coffee_drink':0, 'decaf':1, 'wifi':1, 'place_for_work':1}
item = pd.DataFrame(data=item_data, index=[0])

# Обозначаем атрибуты
feature_cols = establishments.drop(['name'], axis=1)
X = feature_cols

# Используем NearestNeighbors model и kneighbors() методы для нахождения соседей (k neighbors).
# Устанавливаем n_neighbors = 5 для нахождения 5 похожих заведений
# Используем brute изза маленького набора

neigh = NearestNeighbors(n_neighbors=5, algorithm='brute')
neigh.fit(X)
distances, indices = neigh.kneighbors(item)
# Выводим топ 5 рекомендаций фильмов:

print('Рекомендация для "Item":\n')
for i in range(len(distances.flatten())):
  print('{0}: {1}, с расстоянием {2}.'.format(i+1, establishments['name'].iloc[indices.flatten()[i]],distances.flatten()[i]))