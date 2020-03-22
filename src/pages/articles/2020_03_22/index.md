---
title: "[백준] 1676 : 팩토리얼 0의 개수"
date: "2020-03-22"
layout: post
draft: false
path: "/posts/baekjoons/1676/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1676번 문제 : 팩토리얼 0의 개수"
---

# 1676번 : 팩토리얼 0의 개수

👉 [문제 바로가기](https://www.acmicpc.net/problem/1676)



## 배경 지식
- `소수(Prime Number)` : 자신보다 작은 두 개의 자연수를 곱하여 만들 수 없는 1보다 큰 자연수; 1과 자신 이외의 자연수로 나눌 수 없는 자연수
- `소인수(Prime Factor)` : 소수인 인수(약수)
- `소인수분해` : 합성수를 소수의 곱으로 나타내는 방법; 소인수를 구하는 것

## 푼 방법
보기엔 팩토리얼 관련 문제처럼 보이지만, 팩토리얼 알고리즘으로는 절대 풀 수 없는 문제이다. 30!만 계산해보아도 30! = 265,252,859,812,191,058,636,308,480,000,000으로 unsigned __int64의 최대범위를 훌쩍 넘겨버린다.

그럼 어떻게 풀어야할까? 우선 문제를 보면 우리가 구해야 할 것은 **n! 결과값 맨 뒤에서 연속되는 0의 수**이다. 그러면 **뒷자리가 0이 되는 규칙**만 찾으면 굳이 n!을 구할 필요가 없다.


다음의 식들을 살펴보자.
- 10 = 2 x 5
- 100 = 2 x 2 x 5 x 5
- 1000 = 2 x 2 x 2 x 5 x 5 x 5

위 식에서 보면 **뒷자리 0의 개수 = 소인수 2와 5의 쌍의 개수**임을 알 수 있다. 그러므로 우리는 **n!의 소인수 2와 5의 쌍의 개수**를 찾아 주면 된다.

---
<추가 내용>

위 알고리즘은 1억 이상의 수가 들어오면 time out이 뜬다.

소인수 2의 개수보다 소인수 5의 개수는 항상 작으므로 5의 개수만 구해주어도 된다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>

int get_min(int a, int b) {
	return a > b ? b : a;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, n_2 = 0, n_5 = 0;
	
	std::cin >> n;
	
	// n/5 + n/5^2 ... 더 효율적!
	for (int i = 1; i <= n; ++i) {
		int num = i;
		while (num % 2 == 0) {
			if (num % 2 == 0) {
				++n_2;
				num /= 2;
			}
		}
		
		while (num % 5 == 0) {
			if (num % 5 == 0) {
				++n_5;
				num /= 5;
			}
		}
	}
	
	std::cout << get_min(n_2, n_5) << std::endl;
    
    return 0;
}
~~~
