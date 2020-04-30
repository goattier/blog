---
title: "[백준] 3035 : 스캐너"
date: "2020-04-30"
layout: post
draft: false
path: "/posts/baekjoons/3035/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 3035번 문제 : 스캐너"
---

# 3035번 : 스캐너

👉 [문제 바로가기](https://www.acmicpc.net/problem/3035)


## 배경 지식
 - `약간의 수학적 사고력`

## 푼 방법
입력 받은 신문 기사를 (r \* zr)(c \* zc) 행렬로 확대 출력하는데, **각 행과 열의 인덱스를 zr과 zc로 나누어 올림한 인덱스를 입력 받은 신문 기사 배열의 인덱스로 하여 출력 해주면 된다.**

양수의 나눗셈 올림 방법은 여러가지가 있지만 나는 다음의 식을 사용했다.

#### (x + y - 1) / y
**\[x = 피제수(dividend), y = 제수(divisor)\]**


## 내 정답 코드 (C++)

~~~c
#include <iostream>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int r, c, zr, zc;
	
	char article[51][51];
	char result[251][251];
	
	std::cin >> r >> c >> zr >> zc;
	
	for (int i = 1; i <= r; ++i) {
		for (int j = 1; j <= c; ++j)
			std::cin >> article[i][j];
	}
	
	for (int i = 1; i <= r*zr; ++i) {
		for (int j = 1; j <= c*zc; ++j)
			std::cout << article[(i+zr-1) / zr][(j+zc-1) / zc];
		std::cout << '\n';
	}
    
    return 0;
}
~~~


### References
https://hashcode.co.kr/questions/927/cc%EC%97%90%EC%84%9C-%EC%A0%95%EC%88%98-%EB%82%98%EB%88%97%EC%85%88-%EA%B2%B0%EA%B3%BC%EB%A5%BC-%EB%B9%A0%EB%A5%B4%EA%B2%8C-%EC%98%AC%EB%A6%BC%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95