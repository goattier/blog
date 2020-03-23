---
title: "[백준] 2004 : 조합 0의 개수"
date: "2020-03-23"
layout: post
draft: false
path: "/posts/baekjoons/2004/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2004번 문제 : 조합 0의 개수"
---

# 2004번 : 조합 0의 개수

👉 [문제 바로가기](https://www.acmicpc.net/problem/2004)



## 배경 지식
- `이항 계수` : 주어진 크기 집합에서 원하는 개수만큼 **순서없이** 뽑는 조합의 가짓 수
- `소인수분해` : 합성수를 소수의 곱으로 나타내는 방법; 소인수를 구하는 것

## 푼 방법
푸는 방법은 저번 '1676번 : 팩토리얼 0의 개수'와 동일하다.

이번에는 저번과 다르게 시간복잡도를 줄이기 위해 이항 계수(조합)의 소인수 5의 개수만 가지고 문제를 해결하려 했지만, 정답이 아니었다. 왜일까? 반례를 하나 들어보자.

ㅤㅤㅤㅤㅤㅤㅤㅤ**5C1 = 5! / (4! x 1!)**

위 조합에서 소인수 5의 개수만 구해서 0의 개수라고 해버리면 '1'이라는 답이 나온다. 하지만 실제로는 '0'이 나오는게 맞다; **소인수 5가 1개, 소인수 2가 0개이기 때문에 2와 5의 쌍이 없어 조합 결과값의 뒷자리에 0을 만들 수 없다.**

그러므로 **n!의 소인수 2의 개수 - ( k!의 소인수 2의 개수 + (n-k)!의 소인수 2의 개수 )**와 **n!의 소인수 5의 개수 - ( k!의 소인수 5의 개수 + (n-k)!의 소인수 5의 개수 )**의 **쌍의 개수**를 구하면 된다.

## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <cmath>

int get_min(int a, int b) {
	return a > b ? b : a;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, k, n_5 = 0, k_5 = 0, n_k_5 = 0;
	int n_2 = 0, k_2 = 0, n_k_2 = 0;
	
	std::cin >> n >> k;
	
	for (int i = 1; std::pow(5, i) <= n; ++i) // n! 소인수 5의 개수
		n_5 += n / std::pow(5, i);
		
	for (int i = 1; std::pow(2, i) <= n; ++i) // n! 소인수 2의 개수
		n_2 += n / std::pow(2, i);
	
	for (int i = 1; std::pow(5, i) <= k; ++i) // k! 소인수 5의 개수
		k_5 += k / std::pow(5, i);
	
	for (int i = 1; std::pow(2, i) <= k; ++i) // k! 소인수 2의 개수
		k_2 += k / std::pow(2, i);
	
	for (int i = 1; std::pow(5, i) <= (n-k); ++i) // (n-k)! 소인수 5의 개수
		n_k_5 += (n-k) / std::pow(5, i);
	
	for (int i = 1; std::pow(2, i) <= (n-k); ++i) // (n-k)! 소인수 2의 개수
		n_k_2 += (n-k) / std::pow(2, i);
	
	std::cout << get_min(n_5 - (k_5 + n_k_5), n_2 - (k_2 + n_k_2)) << std::endl; // 소인수 2와 5의 쌍의 개수 
    
    return 0;
}
~~~
