---
title: "[백준] 3036 : 링"
date: "2020-03-14"
layout: post
draft: false
path: "/posts/baekjoons/3036/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 3036번 문제 : 링"
---

# 3036번 : 링

👉 [문제 바로가기](https://www.acmicpc.net/problem/3036)



## 배경 지식
- `기약 분수` : 분자와 분모의 공약수가 1뿐이어서 더이상 약분되지 않는 분수; 분자와 분모가 서로소(최대공약수 : 1)인 분수
- `유클리드 호제법` : 2개의 자연수 또는 다항식의 최대공약수를 구하는 알고리즘 => 2개의 자연수(또는 다항식) a, b에 대해서 a를 b로 나눈 나머지를 r이라 하면(단, a>b), a와 b의 최대공약수는 b와 r의 최대공약수와 같다. 이 성질에 따라, b를 r로 나눈 나머지 r'를 구하고, 다시 r을 r'로 나눈 나머지를 구하는 과정을 반복하여 나머지가 0이 되었을 때 나누는 수가 a와 b의 최대공약수이다.



## 푼 방법
원들의 링이 돌면서 맞닿는 **각각의 원주를 구해 그 비를 구하는 것**이 답을 구하는 것이다. 또한, **2Πr1 : 2Πr2 = r1 : r2**이므로, **두 반지름의 비**를 구해도 답이 된다.

정답은 기약분수의 형태로 나타내야 되니, 두 반지름의 비가 서로소가 될때까지 공약수로 나누어주면 된다. 즉, **두 반지름의 최대공약수를 구해 나누어 주면** 기약분수의 형태가 된다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <vector>

int gcd(int a, int b) { // 최대공약수 구하는 함수 (유클리드 호제법 : 재귀이용)
	return b ? gcd(b, a%b) : a;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	
	std::cin >> n;
	
	std::vector<int> num(n);
	
	for (int i = 0; i < n; ++i)
		std::cin >> num[i];
	
	for (int i = 1; i < n; ++i) {
		int gcd_num = (num[0] > num[i]) ? gcd(num[0], num[i]) : gcd(num[i], num[0]);
		
		std::cout << (num[0] / gcd_num) << "/" << (num[i] / gcd_num) << '\n';
	}
	
	return 0;
}
~~~

### 참고 사이트
https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95