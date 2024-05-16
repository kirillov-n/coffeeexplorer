import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors

# Загружаем наборы данных
establishments = pd.read_csv('establishments.csv')
user = pd.read_csv('user.csv')

# Избавляемся от ненужных столбцов
# establishments = establishments.drop(['address_id', 'establishmentID', 'description', 'picture'], axis=1)

# Заменяем True на 1 и False на 0
cols_to_replace = ['veg_positions', 'alt_brewing', 'alt_milk', 'small_pets', 'big_pets', 'food', 'non_coffee_drink', 'decaf', 'wifi',
                   'place_for_work']
establishments[cols_to_replace] = establishments[cols_to_replace].replace({True: 1, False: 0})
user[cols_to_replace] = user[cols_to_replace].replace({True: 1, False: 0})
user_prepared = user.drop(['userID'], axis=1)
user_prepared = user_prepared[['avg_bill', 'veg_positions', 'alt_brewing', 'alt_milk', 'small_pets', 'big_pets', 'food', 'non_coffee_drink', 'decaf', 'wifi',
                   'place_for_work']]
# Обозначаем атрибуты
feature_cols = establishments.drop(['name', 'establishmentID'], axis=1)
X = feature_cols
X = X[['avg_bill', 'veg_positions', 'alt_brewing', 'alt_milk', 'small_pets', 'big_pets', 'food', 'non_coffee_drink', 'decaf', 'wifi', 'place_for_work']]

# Используем NearestNeighbors model и kneighbors() методы для нахождения соседей (k neighbors).
# Устанавливаем n_neighbors = 5 для нахождения 5 похожих заведений
neigh = NearestNeighbors(n_neighbors=5, algorithm='auto')
neigh.fit(X)
distances, indices = neigh.kneighbors(user_prepared)

# Выводим топ 5 рекомендаций кофеен:
print('Рекомендация для:', user['userID'][0])
for i in range(len(distances.flatten())):
    print('{0}: {1}, с расстоянием {2}.'.format(i + 1, establishments['establishmentID'].iloc[indices.flatten()[i]],
                                                distances.flatten()[i]))
