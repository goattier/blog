---
title: "[백준] 2355 : 시그마"
date: "2020-05-10"
layout: post
draft: false
path: "/posts/baekjoons/2355/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2355번 문제 : 시그마"
---

# 2355번 : 시그마

👉 [문제 바로가기](https://www.acmicpc.net/problem/2355)


## 배경 지식
 - `등차수열의 합`


## 푼 방법
등차수열의 합의 공식을 사용해서 풀었다.


## 내 정답 코드 (C++)
~~~c
#include <iostream>
#define SWAP(a, b) {a^=b^=a^=b;}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	long long int a, b;
	
	std::cin >> a >> b;
	
	if (a > b) SWAP(a, b);
	
	std::cout << ((b-a+1) * (a+b)) / 2 << std::endl;

	return 0;
}
~~~