---
title: "[백준] 1037 : 약수"
date: "2020-03-15"
layout: post
draft: false
path: "/posts/baekjoons/1037/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1037번 문제 : 약수"
---

# 1037번 : 약수

👉 [문제 바로가기](https://www.acmicpc.net/problem/1037)



## 배경 지식
- `약수` : 어떤 정수를 나누어 떨어지게 하는 수

## 푼 방법
결론부터 말하면, 입력 받은 진짜 약수(1과 자신을 제외한 약수) 중 **제일 작은 약수와 제일 큰 약수의 곱**이 답이 된다.

예를 들어,
12의 약수 : 1, 2, 3, 4, 6, 12 중 문제에서 말하는 진짜 약수는 자신과 1을 제외한 2, 3, 4, 6이 된다. 여기서 2와 6을 곱하면 12가 되고, 3과 4를 곱하면 12가 된다.


## 내 정답 코드 (C++)
~~~c
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	
	std::cin >> n;
	
	std::vector<int> factor(n);
	
	for (int i = 0; i < n; ++i)
		std::cin >> factor[i];
	
	std::sort(factor.begin(), factor.end());
	
	std::cout << factor[0] * factor[factor.size()-1] << std::endl;

	return 0;
}
~~~