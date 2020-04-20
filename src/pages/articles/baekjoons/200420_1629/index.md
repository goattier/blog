---
title: "[백준] 1629 : 곱셈"
date: "2020-04-20"
layout: post
draft: false
path: "/posts/baekjoons/1629/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1629번 문제 : 곱셈"
---

# 1629번 : 곱셈

👉 [문제 바로가기](https://www.acmicpc.net/problem/1629)


## 배경 지식
 - `분할 정복(Divide and Conquer)` : 그대로 해결할 수 없는 주어진 문제를 **더 이상 문제를 나눌 수 없을 때까지 둘 이상의 작은 부분 문제로 분할하여 문제를 해결**하고, **구해진 문제들을 원 문제로 병합하여 해결**하는 알고리즘


## 푼 방법
이 문제를 풀 때 주의해야 할 사항이 2가지가 있다.

 1. 시간 초과 (brute force 알고리즘 사용 시)
 2. 자료형 overflow
 
첫번째로, int 자료형의 MAX 범위까지 연산 횟 수(=B)를 받을 수 있기 때문에 O(N) : brute force 알고리즘으로 코드를 작성하면 TLE(Time Limit Exceeded)가 날 것 이다. 그래서 우리는 분할 정복 알고리즘을 사용해서 O(logN)의 시간으로 단축시켜야 한다.

두번째로, unsigned long long int의 자료형을 사용한다 하더라도 큰 자연수(=A)를 받아 몇 번 곱해버리면 overflow가 나기에, 우리는 연산을 진행할 때마다 mod C 를 해주어야 overflow 없이 결과 값을 얻을 수 있다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>

typedef unsigned long long ull;

int daq(ull result, const ull& B, const ull& C) {
	if (B == 1)
		return result % C;
	
	if (B % 2 == 0)
		return daq((result * result) % C, B/2, C);
	else
		return ((daq((result * result) % C, B/2, C)) * result) % C;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	ull A, B, C;
	
	std::cin >> A >> B >> C;

	std::cout << daq(A % C, B, C) << std::endl;
	
	return 0;
}
~~~