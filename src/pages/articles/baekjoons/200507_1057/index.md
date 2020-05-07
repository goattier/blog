---
title: "[백준] 1057 : 토너먼트"
date: "2020-05-07"
layout: post
draft: false
path: "/posts/baekjoons/1057/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1057번 문제 : 토너먼트"
---

# 1057번 : 토너먼트

👉 [문제 바로가기](https://www.acmicpc.net/problem/1057)


## 배경 지식
 - `약간의 수학적 사고력`


## 푼 방법
**임한수가 김지민보다 배정받은 번호 순서가 늦다고 가정하고 문제에 접근**했다.(입력받은 임한수의 번호가 김지민보다 작을 경우 swap)

round를 올리며 김지민과 임한수의 번호를 다시 배정했을 때, **임한수가 짝수 번호를 배정**받고 **임한수 번호 - 김지민 번호 == 1** 이면 그 round에서 둘이 대결을 펼친다. **그 round가 나오면 출력하고 안 나올 경우 -1을 출력**한다.

하지만 알다시피, **안 만나는 경우는 없다.**


## 내 정답 코드 (C++)
~~~c
#include <iostream>
#define SWAP(a, b) {a^=b^=a^=b;}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, kim, lim, round = 1;
	
	std::cin >> n >> kim >> lim;
	
	if (lim < kim)
		SWAP(lim, kim);
	
	while (n != 1) {
		if (!(lim % 2) && (lim - kim) == 1) {
			std::cout << round << std::endl;
			return 0;
		}
		else
			++round;
		
		lim = lim % 2 ? lim / 2 + 1 : lim / 2;
		kim = kim % 2 ? kim / 2 + 1 : kim / 2;
		n = n % 2 ? n / 2 + 1 : n / 2;
	}
	
	std::cout << "-1" << std::endl;
	
	return 0;
}
~~~