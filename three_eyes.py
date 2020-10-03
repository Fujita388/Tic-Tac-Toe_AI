import random


list_0 = [0,0,0,0,0,0,0,0,0]
list_start = [0,1,2,3,4,5,6,7,8]


#win関数
def win(input_list):
    if (input_list[0] == input_list[1] == input_list[2] == 1 or  
        input_list[3] == input_list[4] == input_list[5] == 1 or
        input_list[6] == input_list[7] == input_list[8] == 1 or
        input_list[0] == input_list[3] == input_list[6] == 1 or
        input_list[1] == input_list[4] == input_list[7] == 1 or
        input_list[2] == input_list[5] == input_list[8] == 1 or
        input_list[0] == input_list[4] == input_list[8] == 1 or
        input_list[2] == input_list[4] == input_list[6] == 1):
        return 1       #maru_win
    elif (input_list[0] == input_list[1] == input_list[2] == 2 or  
        input_list[3] == input_list[4] == input_list[5] == 2 or
        input_list[6] == input_list[7] == input_list[8] == 2 or
        input_list[0] == input_list[3] == input_list[6] == 2 or
        input_list[1] == input_list[4] == input_list[7] == 2 or
        input_list[2] == input_list[5] == input_list[8] == 2 or
        input_list[0] == input_list[4] == input_list[8] == 2 or
        input_list[2] == input_list[4] == input_list[6] == 2):
        return -1      #batsu_win
    else:
        return 0       #draw


def win1(input_list):
    if (input_list[0] == input_list[1] == input_list[2] == 1 or  #()をつけて改行
        input_list[3] == input_list[4] == input_list[5] == 1 or
        input_list[6] == input_list[7] == input_list[8] == 1 or
        input_list[0] == input_list[3] == input_list[6] == 1 or
        input_list[1] == input_list[4] == input_list[7] == 1 or
        input_list[2] == input_list[5] == input_list[8] == 1 or
        input_list[0] == input_list[4] == input_list[8] == 1 or
        input_list[2] == input_list[4] == input_list[6] == 1):
        return "勝ち"
    elif (input_list[0] == input_list[1] == input_list[2] == 2 or  
        input_list[3] == input_list[4] == input_list[5] == 2 or
        input_list[6] == input_list[7] == input_list[8] == 2 or
        input_list[0] == input_list[3] == input_list[6] == 2 or
        input_list[1] == input_list[4] == input_list[7] == 2 or
        input_list[2] == input_list[5] == input_list[8] == 2 or
        input_list[0] == input_list[4] == input_list[8] == 2 or
        input_list[2] == input_list[4] == input_list[6] == 2):
        return "負け"
    else:
        return "引き分け"


#要素0のインデックス抽出
def func(input_list):
    return [i for i, x in enumerate(input_list) if x == 0]


#表の作成関数
def show(a):
    print(f"{a[0]}{a[1]}{a[2]}")
    print(f"{a[3]}{a[4]}{a[5]}")
    print(f"{a[6]}{a[7]}{a[8]}")


#再帰関数をかく
def saiki(input_list2):
    x = input_list2.count(0)
    if x == 0:                              #終端条件:試合終了(引き分け含む)
        #show(input_list2)
        return win(input_list2)
    if win(input_list2) != 0:          #終端条件:試合終了(引き分け含まず)
        #show(input_list2)
        return win(input_list2)
    y = random.choice(func(input_list2))    #再帰:決着がついていない
    input_list2[y] = 2 - (x % 2)      
    return saiki(input_list2)         


#100回分抽出
def evaluate(initial_list):
    s = 0
    N = 100
    for _ in range(N):              
        a = initial_list.copy()
        s += saiki(a)
    return s/N


#評価関数(今の状態で最適な場所に次の一手を進める)
def three_eyes(initial_list):
    lists1 = []
    lists2 = []
    for i in func(initial_list):
        a = initial_list.copy()
        a[i] = 2
        lists1.append(evaluate(a))
        lists2.append(i)
    y = lists1.index(min(lists1))
    z = lists2[y]
    initial_list[z] = 2
    return initial_list 

# 人間と対戦    再帰           
# def match(initial_list):
#     x = initial_list.count(0)
#     if x == 1:
#         print("\n置きたい場所の番号を選んでください:")
#         show(initial_list)
#         choice = int(input())
#         if not choice in func(initial_list):
#             print("そこには置けません")
#             return match(initial_list)
#         initial_list[choice] = 1
#         print("")
#         show(initial_list)
#         return print("\n" + win1(initial_list))
#     if x == 9:
#         print("空白:0,自分(マル):1,相手(バツ):2" + "\n置きたい場所の番号を選んでください:")
#         show(list_start)
#         choice = int(input())
#         initial_list[choice] = 1
#         show(three_eyes(initial_list))
#         print("引き分け")
#         return match(initial_list)
#     print("\n置きたい場所の番号を選んでください:")
#     show(initial_list)
#     choice = int(input())
#     if not choice in func(initial_list):
#         print("そこには置けません")
#         return match(initial_list)
#     initial_list[choice] = 1
#     show(three_eyes(initial_list))   #最適な場所にバツを打つ
#     if win1(initial_list) != "引き分け":
#         return print("\n" + win1(initial_list))
#     print(win1(initial_list))
#     return match(initial_list)


# match(list_0)

def last(initial_list):
    show(initial_list)
    print("\n置きたい場所の番号を選んでください:")
    choice = int(input())
    if not choice in func(initial_list):
        print("そこには置けません")
        return last(initial_list)
    initial_list[choice] = 1
    show(initial_list)
    print(win1(initial_list))

#人間と対戦     while
def match(initial_list):
    x = initial_list.count(0)
    show(list_start)
    print("空白:0,自分(マル):1,相手(バツ):2" + "\n置きたい場所の番号を選んでください:")
    choice = int(input())
    initial_list[choice] = 1
    show(three_eyes(initial_list))
    while x > 1:
        print("\n置きたい場所の番号を選んでください:")
        show(initial_list)
        choice = int(input())
        if not choice in func(initial_list):
            print("そこには置けません")
            continue
        initial_list[choice] = 1
        print("")
        show(three_eyes(initial_list))   #最適な場所にバツを打つ
        if win1(initial_list) != "引き分け":
            print("\n" + win1(initial_list))   
            break
        print(win1(initial_list))
        x = initial_list.count(0)    #xを上書き
    if win1(initial_list) != "引き分け":
        return
    last(initial_list)


match(list_0)
