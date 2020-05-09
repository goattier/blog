---
title: "[백준] 1964 : 오각형, 오각형, 오각형…"
date: "2020-05-09"
layout: post
draft: false
path: "/posts/baekjoons/1964/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1964번 문제 : 오각형, 오각형, 오각형…"
---

# 1964번 : 오각형, 오각형, 오각형…

👉 [문제 바로가기](https://www.acmicpc.net/problem/1964)


## 배경 지식
 - `약간의 수학적 사고력`


## 푼 방법
**각 단계에서 오각형의 점이 증가하는 규칙**을 찾으면 된다. 내가 찾은 규칙은 아래와 같다.

> #### i 단계 점의 개수 = i-1단계 점의 개수 + (i*2) + (i+1)

**각 단계의 점의 개수를 구한 후 45678로 나눈 나머지를 계속 저장**해 나간다.

마지막으로 입력받은 N단계의 점의 개수를 출력한다.


## 내 정답 코드 (C++)
~~~c
#include <iostream>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, dot_cnt = 1;
	
	std::cin >> n;
	
	for (int i = 1 ; i <= n; ++i) {
		dot_cnt += ((i*2)+(i+1));
		dot_cnt %= 45678;
	}
	
	std::cout << dot_cnt << std::endl;
	
	return 0;
}
~~~